export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function validarEmail(texto: string): boolean {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (texto.match(validRegex)) {
    return true;
  }
  else {
    return false;
  }
}

export function validarNumero(valor: any): boolean{
  return !isNaN(parseFloat(valor)) && isFinite(valor);
}

export function formatarCpf(valor: string|number): string {
  let valorFormatado = valor + '';

  valorFormatado = valorFormatado
      .padStart(11, '0')                  // item 1
      .substr(0, 11)                      // item 2
      .replace(/[^0-9]/, '')              // item 3
      .replace(                           // item 4
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4'
      );

  return valorFormatado;
}

export function desformatarCpf(valor:string): string {
  let valorFormatado = valor;

  valorFormatado = valorFormatado.replace('.','').replace('-','');
  return valorFormatado;
}
