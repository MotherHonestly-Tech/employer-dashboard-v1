import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink
} from 'react-plaid-link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SelectOption } from '@mui/base';
import { styled } from '@mui/material/styles';

import MHDialog from '../../components/Dialog/MHDialog';
import { MHSelect } from '../Form/MHSelect';
import MHFormControl from '../Form/MHFormControl';
import MHButton from '../Button/MHButton';
import UploadButton from '../Form/UploadButton';
import Notification from '../UI/Notification';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';

import { ReactComponent as ReceiptIcon } from '../../static/svg/receipt.svg';
import { ReactComponent as JpgIcon } from '../../static/svg/jpg-file.svg';
import { ReactComponent as CheckCircleFillIcon } from '../../static/svg/check-circle-fill.svg';
import { ReactComponent as CheckMarkRoundedLargeIcon } from '../../static/svg/check-mark-rounded-lg.svg';
import {
  resolveErrorMessage,
  formatFileSize,
  isValidFileType,
  isValidFileSize
} from '../../utils/utils';
import * as validators from '../../utils/validators';
import { HttpResponse } from '../../models/api.interface';
import AuthContext from '../../store/context/auth-context';
import DashboardContext from '../../store/context/dashboard.context';
import { Category, Merchant } from '../../models/wallet';
import NotificationContext from '../../store/context/notifications.context';
import PlaidLinkContext from '../../services/plaid-link';

const UploadWrapper = styled('div')<{
  isdragactive: string;
}>(({ theme, isdragactive }) => ({
  border: 1,
  borderColor: '#454545',
  padding: theme.spacing(2),
  textAlign: 'center',
  borderStyle: 'dashed',
  overflowX: 'hidden',
  position: 'relative',
  '& > svg': {
    textAlign: 'center',
    display: 'inline-block',
    marginBottom: theme.spacing(1)
  },
  ...(isdragactive && {
    '&::after': {
      width: '100%',
      height: '100%',
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: '#b4ebe9',
      opacity: 0.5,
      transition: 'opacity 0.2s ease-in-out'
    }
  })
}));

const UploadWidget = ({ isDragActive }: { isDragActive: string }) => (
  <UploadWrapper isdragactive={isDragActive}>
    <ReceiptIcon alignmentBaseline="central" />
    <Typography
      variant="body1"
      fontFamily={'Area-Normal-Bold'}
      color="#28404A"
      gutterBottom>
      Drop your receipt here, or
      <Typography component="span" color="#009688">
        {' '}
        browse
      </Typography>
    </Typography>
    <Typography variant="body1" color="#A6A6A6" fontSize="10px" gutterBottom>
      Supports jpg, png, pdf
    </Typography>
    <Typography variant="body1" color="#A6A6A6" align="center" fontSize="10px">
      (maximum size 2mb)
    </Typography>
  </UploadWrapper>
);

const UploadThumb = ({ file }: { file: File | null }) =>
  file ? (
    <Stack direction="row" alignItems="center" bgcolor="#E5E5E5" p={1} mt={2}>
      <Stack direction="row" alignItems="center" flexGrow={1} spacing={1}>
        {/* <img src={URL.createObjectURL(file)} alt="receipt" /> */}
        <JpgIcon />
        <div>
          <Typography
            variant="body1"
            color="#28404A"
            fontSize="10px"
            gutterBottom>
            {file!.name}
          </Typography>
          <Typography variant="body1" color="#A6A6A6" fontSize="10px">
            {formatFileSize(file!.size)}
          </Typography>
        </div>
      </Stack>

      <CheckCircleFillIcon color="#009688" />
    </Stack>
  ) : null;

const UploadReceipt = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dashboardCtx = React.useContext(DashboardContext);
  const { staticDataCacheMap } = dashboardCtx;

  const authCtx = React.useContext(AuthContext);
  const { userId } = authCtx;
  const notificationCtx = React.useContext(NotificationContext);
  const { pushNotification } = notificationCtx;

  const uploadBtnRef = React.useRef<any>(null);

  const {
    value: enteredCategory,
    valid: enteredCategoryIsValid,
    error: enteredCategoryHasError,
    onChange: categoryInputChangeHandler,
    onBlur: categoryInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredMerchant,
    valid: enteredMerchantIsValid,
    error: enteredMerchantHasError,
    onChange: merchantInputChangeHandler,
    onBlur: merchantInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const {
    value: enteredAmount,
    valid: enteredAmountIsValid,
    error: enteredAmountHasError,
    onChange: amountInputChangeHandler,
    onBlur: amountInputBlurHandler,
    markAsTouched: markAmountInputAsTouched
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    },
    {
      validator: (value: string) => validators.min(1)(value)
    },
    {
      validator: (value: string) => validators.isNumber(value)
    }
  ]);

  const {
    value: enteredMerchantName,
    valid: enteredMerchantNameIsValid,
    error: enteredMerchantNameHasError,
    onChange: merchantNameInputChangeHandler,
    onBlur: merchantNameInputBlurHandler,
    markAsTouched: markMerchantNameInputAsTouched
  } = useInput([
    {
      validator: (value: string) => {
        if (enteredMerchant === '-1') {
          return validators.required(value);
        }
        return true;
      }
    }
  ]);

  const {
    value: enteredMerchantWebsite,
    valid: enteredMerchantWebsiteIsValid,
    error: enteredMerchantWebsiteHasError,
    onChange: merchantWebsiteInputChangeHandler,
    onBlur: merchantWebsiteInputBlurHandler,
    markAsTouched: markMerchantWebsiteInputAsTouched
  } = useInput([
    {
      validator: (value: string) => {
        if (enteredMerchant === '-1') {
          return validators.required(value);
        }
        return true;
      }
    }
  ]);

  const {
    value: enteredMerchantAddress,
    valid: enteredMerchantAddressIsValid,
    error: enteredMerchantAddressHasError,
    onChange: merchantAddressInputChangeHandler,
    onBlur: merchantAddressInputBlurHandler,
    markAsTouched: markMerchantAddressInputAsTouched
  } = useInput([
    {
      validator: (value: string) => {
        if (enteredMerchant === '-1') {
          return validators.required(value);
        }
        return true;
      }
    }
  ]);

  const {
    value: enteredDesc,
    valid: enteredDescIsValid,
    error: enteredDescHasError,
    onChange: descInputChangeHandler,
    onBlur: descInputBlurHandler
  } = useInput([
    {
      validator: (value: string) => validators.required(value)
    }
  ]);

  const history = useHistory();
  const linkCtx = React.useContext(PlaidLinkContext);
  const { linkToken, isOauth, generateLinkToken } = linkCtx;

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isDragActive, setIsDragActive] = React.useState('');
  const [completed, setCompleted] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(isOauth);

  const { loading, error, sendHttpRequest: uploadReceipt } = useHttp();

  let formIsValid =
    enteredCategoryIsValid &&
    enteredMerchantIsValid &&
    enteredAmountIsValid &&
    enteredMerchantNameIsValid &&
    enteredMerchantWebsiteIsValid &&
    enteredMerchantAddressIsValid &&
    enteredDescIsValid &&
    uploadedFile;

  let amountErrorTip = resolveErrorMessage(enteredAmountHasError)(
    'Please enter a valid amount'
  );
  let merchantNameErrorTip = resolveErrorMessage(enteredMerchantNameHasError)(
    'Please enter a merchant name'
  );
  let merchantWebsiteErrorTip = resolveErrorMessage(
    enteredMerchantWebsiteHasError
  )('Please enter a merchant website');
  let merchantAddressErrorTip = resolveErrorMessage(
    enteredMerchantAddressHasError
  )('Please enter a merchant address');

  const uploadChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(e.target.files as FileList);
    const valid = isValidFile(file);
    valid && setUploadedFile(file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e: ProgressEvent) => {
    //     const image = (e.target as FileReader).result as string;
    //     setImage(image);
    //   }
    //   reader.readAsDataURL(file);
    // }
  };

  const dragFileHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    (e.type === 'dragenter' || e.type === 'dragover') &&
      setIsDragActive(Math.random().toString());
    e.type === 'dragleave' && setIsDragActive('');
  };

  const dropFileHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    const [file] = Array.from(e.dataTransfer.files as FileList);
    isValidFile(file) && setUploadedFile(file);
    setIsDragActive('');
  };

  const isValidFile = (file: File) => {
    const fileRef = uploadBtnRef.current;

    if (!file) {
      pushNotification({
        type: 'error',
        message: 'Please upload an image of your receipt',
        duration: 14000
      });
      return;
    }

    const isFileSizeValid = isValidFileSize(file, 2);
    const isMimeTypeValid = isValidFileType(
      file,
      fileRef.uploadEl.getAttribute('accept')
    );

    !isMimeTypeValid &&
      pushNotification({
        type: 'error',
        message: 'Please upload jpeg, png or pdf files',
        duration: 14000
      });
    !isFileSizeValid &&
      pushNotification({
        type: 'error',
        message: 'File size should be less than 2MB',
        duration: 14000
      });

    return isFileSizeValid && isMimeTypeValid;
  };

  function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!formIsValid || !isValidFile(uploadedFile as File)) {
      markAmountInputAsTouched();
      markMerchantNameInputAsTouched();
      markMerchantWebsiteInputAsTouched();
      markMerchantAddressInputAsTouched();
      return;
    }

    const [category] = staticDataCacheMap
      .get('categories')!
      .filter((category) => category.id === +enteredCategory) as Category[];

    const [merchant] = staticDataCacheMap
      .get('merchants')!
      .filter((merchant) => merchant.id === +enteredMerchant) as Merchant[];

    const formData = new FormData();
    formData.append('reciept', uploadedFile as Blob);
    formData.append('categoryId', enteredCategory);
    formData.append('merchantId', enteredMerchant);
    formData.append('amount', enteredAmount);
    formData.append('description', enteredDesc);

    formData.append('categoryName', category.categoryName);
    formData.append('merchantName', merchant.merchantName);
    formData.append('website', merchant.website);
    formData.append('merchantAddress', merchant.address);

    formData.append('customerId', String(userId));

    if (enteredMerchant === String(-1)) {
      formData.set('merchantName', enteredMerchantName);
      formData.set('website', enteredMerchantWebsite);
      formData.set('merchantAddress', enteredMerchantAddress);
    }

    uploadReceipt(
      process.env.REACT_APP_API_BASE_URL +
        'employee/dashboard/reembursement/pending',
      {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data'
        },
        body: formData
      },
      (response: HttpResponse<unknown>) => {
        setIsUploaded(true);
      }
    );
  }

  const onSuccess = React.useCallback(
    (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log(public_token, metadata);
      setCompleted(true);
      history.replace('/organization/wallet');
      // window.history.pushState('', '', '/');
    },
    [history]
  );
  
  const onExit = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const config: PlaidLinkOptions = {
    token: linkToken,
    onSuccess,
    onExit,
    ...(isOauth && {
      receivedRedirectUri: window.location.href
    })
  };

  const { open: openLink, ready } = usePlaidLink(config);

  React.useEffect(() => {
    generateLinkToken();
  }, [generateLinkToken]);

  React.useEffect(() => {
    if (ready && isUploaded) {
      openLink();
    }
  }, [isUploaded, ready, openLink]);

  React.useEffect(() => {
    if (isOauth && ready) {
      openLink();
    }
  }, [isOauth, ready, openLink]);

  return (
    <React.Fragment>
      {error && <Notification type="error" message={error.message} />}
      <MHDialog
        open={open}
        title={!completed && !isUploaded ? 'Upload your receipt' : ''}
        handleClose={onClose}
        scroll="paper"
        actions={
          !completed ? (
            !isUploaded ? (
              <MHButton
                type="submit"
                form="upload-receipt-form"
                loading={loading}
                fullWidth>
                Proceed
              </MHButton>
            ) : null
          ) : (
            <MHButton type="button" fullWidth onClick={onClose}>
              Close modal
            </MHButton>
          )
        }
        maxWidth={completed ? 'xs' : 'sm'}
        fullWidth>
        {/* <Typography variant="h3" align="center" color="#28404A" gutterBottom>
      Upload Your Receipt
    </Typography> */}
        {!completed ? (
          !isUploaded ? (
            <Box
              component={'form'}
              onSubmit={submitHandler}
              id="upload-receipt-form">
              <MHSelect
                label="Select a Category"
                placeholder="Pick a category"
                options={
                  (staticDataCacheMap.get('categories') as SelectOption<
                    string
                  >[]) || []
                }
                value={enteredCategory}
                onChange={(val) => categoryInputChangeHandler(val as string)}
                onBlur={categoryInputBlurHandler}
                popperWidth="80%"
              />

              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <MHSelect
                    label="Select a Merchant"
                    placeholder="Pick a merchant"
                    options={
                      (staticDataCacheMap.get('merchants') as SelectOption<
                        string
                      >[]) || []
                    }
                    value={enteredMerchant}
                    onChange={(val) =>
                      merchantInputChangeHandler(val as string)
                    }
                    onBlur={merchantInputBlurHandler}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MHFormControl
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    label="Amount ($)"
                    value={enteredAmount}
                    onChange={amountInputChangeHandler}
                    onBlur={amountInputBlurHandler}
                    error={amountErrorTip}
                    min={0}
                  />
                </Grid>
              </Grid>

              {enteredMerchant === '-1' && (
                <>
                  <MHFormControl
                    id="merchantName"
                    type="text"
                    label="Enter Merchant Name"
                    placeholder="Enter merchant name"
                    value={enteredMerchantName}
                    onChange={merchantNameInputChangeHandler}
                    onBlur={merchantNameInputBlurHandler}
                    error={merchantNameErrorTip}
                  />

                  <MHFormControl
                    id="merchantWebsite"
                    type="text"
                    label="Merchant url/website"
                    placeholder="Enter website address"
                    value={enteredMerchantWebsite}
                    onChange={merchantWebsiteInputChangeHandler}
                    onBlur={merchantWebsiteInputBlurHandler}
                    error={merchantWebsiteErrorTip}
                  />

                  <MHFormControl
                    id="merchantAddress"
                    type="text"
                    label="Merchant address"
                    placeholder="Enter merchant address"
                    value={enteredMerchantAddress}
                    onChange={merchantAddressInputChangeHandler}
                    onBlur={merchantAddressInputBlurHandler}
                    error={merchantAddressErrorTip}
                    multiline
                    rows={3}
                  />
                </>
              )}

              <MHFormControl
                id="desc"
                label="Expense Description"
                placeholder="A short description of expense"
                type="text"
                value={enteredDesc}
                onChange={descInputChangeHandler}
                onBlur={descInputBlurHandler}
                multiline
                rows={8}
              />

              <UploadButton
                htmlFor="receipt-upload"
                file={uploadedFile}
                onChange={uploadChangeHandler}
                element={<UploadWidget isDragActive={isDragActive} />}
                fileThumb={<UploadThumb file={uploadedFile} />}
                onDrag={dragFileHandler}
                onDrop={dropFileHandler}
                accept="image/*, application/pdf, .jpg, image/jpeg, image/png"
                ref={uploadBtnRef}
              />
            </Box>
          ) : (
            <Box
              sx={{
                px: 2,
                '& svg': {
                  display: 'block'
                }
              }}>
              <Typography
                variant="h2"
                align="center"
                color="primary.main"
                gutterBottom
                paragraph>
                Add your Payout Account
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="primary.main"
                paragraph
                gutterBottom>
                In order to proceed with your application for reimbursement, we
                will need to verify your Payout account.
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="primary.main"
                paragraph
                gutterBottom>
                You will be redirected to Plaid to add your Payout account
                shortly.
              </Typography>
            </Box>
          )
        ) : (
          <Box
            sx={{
              px: 2,
              '& svg': {
                display: 'block',
                marginX: 'auto',
                marginY: '30px'
              }
            }}>
            <CheckMarkRoundedLargeIcon />
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              gutterBottom
              paragraph>
              You have successfully requested for a reimbursement on your
              expense.
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="primary.main"
              paragraph
              gutterBottom>
              Your receipt will be reviewed by MH Team and your account will be
              credited.
            </Typography>
          </Box>
        )}
      </MHDialog>
    </React.Fragment>
  );
};

export default UploadReceipt;
