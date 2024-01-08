import Swal from 'sweetalert2';

/**
 * @author Jogan Ortiz Muñoz
 * @description Function that displays the sweetAlert
 * @param icono 
 * @param message 
 * @returns Promise<SweetAlertResult<any>>
 */
export const alertSweet = (icono: 'warning'|'error'|'success'|'info'|'question', message: string) => {
    return Swal.fire({
        icon: icono,
        html: message,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        stopKeydownPropagation: true
    });
}

/**
 * @author Jogan Ortiz Muñoz
 * @description Function that displays the sweetAlert
 * @param message 
 * @returns Promise<SweetAlertResult<any>>
 */
export const alertSweetThen = (message: string) =>{ 
    return Swal.fire({
        html: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        stopKeydownPropagation: true
    });
}

/**
 * @author Jogan Ortiz Muñoz
 * @description Function that shows the alert for a certain time
 * @param message 
 * @param timer 
 * @returns Promise<SweetAlertResult<any>>
 */
export const alertSweetTimer = (message: string = '') => {
    let timerInterval: number;
    
    return Swal.fire({
        title: "Loading process...!",
        html: message,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        stopKeydownPropagation: true,
        didOpen: () => {
            Swal.showLoading(Swal.getDenyButton())
        },
        willClose: () => {
            if(timerInterval) {
                clearInterval(timerInterval)
            }
        }
    });
}

/**
 * @author Jogan Ortiz Muñoz
 * @description function that closes the sweeltalert
 */
export const  alertSweetClose = () => {
    Swal.close();
}

export const alertSweetToast = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 10000000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Toast.fire({
        icon: "success",
        title: "Signed in successfully",
        html: "prueba",
        iconHtml: "<i class='pi pi-database'></i>",
        background: ""
    });

    return Toast;
}