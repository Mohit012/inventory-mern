import Swal, { SweetAlertOptions } from 'sweetalert2';

const toastMessage = (props: SweetAlertOptions) => {
  Swal.fire({
    ...props,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false, // Hide the "OK" button as it will auto-close
  });
};

export default toastMessage;
