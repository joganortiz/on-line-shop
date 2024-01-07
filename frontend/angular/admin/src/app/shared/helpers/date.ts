export function formatearFechaHora(fecha: string) {
    const date = new Date(fecha);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    const horas = date.getHours();
    const minutos = date.getMinutes();
    
    
    // Asegurarse de que los valores tengan dos dígitos
    // if (dia < 10) {
    //   dia = '0' + dia;
    // }
    // if (mes < 10) {
    //   mes = '0' + mes;
    // }
    // if (horas < 10) {
    //   horas = '0' + horas;
    // }
    // if (minutos < 10) {
    //   minutos = '0' + minutos;
    // }
    
    const fechaFormateada = `${validateNumber(dia)}-${validateNumber(mes)}-${validateNumber(anio)} ${validateNumber(horas)}:${validateNumber(minutos)}`;
    return fechaFormateada;
}

const validateNumber = (number: number): string => {
    return `${(number < 10) ? '0'+number : number }`;
}