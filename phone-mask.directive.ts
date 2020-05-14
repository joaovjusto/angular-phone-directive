import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneInputMask]'
})
export class PhoneInputMaskDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('keyup') onkeyup() {
    const target = this.elementRef.nativeElement;
    const nrTarget = target.value.replace(/\D/g, "");;

    if (nrTarget == null) {
      return;
    }

    if (nrTarget.length >= 2 && nrTarget.length < 6) {
      target.value = this.setMascaraPrefixo(this.elementRef.nativeElement.value);
    } else if (nrTarget.length == 6) {
      target.value = this.setAddDash(this.elementRef.nativeElement.value);
    } else if (nrTarget.length == 10) {
      target.value = this.setMascaraTelefone(this.elementRef.nativeElement.value);
    } else if (nrTarget.length == 11) {
      target.value = this.setMascaraTelefoneNovo(this.elementRef.nativeElement.value);
    } else {
      target.value = target.value.substring(0, 15);
    }
  }

  private setAddDash(phone) {
    phone = phone.replace(/[^0-9\.]+/g, '');

    const parte1 = phone.slice(0, 2);
    const parte2 = phone.slice(2, phone.length);
    return `(${parte1}) ${parte2}-`;
  }
  private setMascaraPrefixo(phone) {
    phone = phone.replace(/[^0-9\.]+/g, '');

    const parte1 = phone.slice(0, 2);
    const parte2 = phone.slice(2, phone.length);
    return `(${parte1}) ${parte2}`;
  }
  private setMascaraTelefone(phone) {
    phone = phone.replace('-', '');
    phone = phone.replace(/[^0-9\.]+/g, '');

    const prefixo = phone.slice(0, 2);
    const parte1 = phone.slice(2, 6);
    const parte2 = phone.slice(6, 10);
    return `(${prefixo}) ${parte1}-${parte2}`;
  }

  private setMascaraTelefoneNovo(phone) {
    phone = phone.replace('-', '');
    phone = phone.replace(/[^0-9\.]+/g, '');

    const prefixo = phone.slice(0, 2);
    const parte1 = phone.slice(2, 7);
    const parte2 = phone.slice(7, 11);
    return `(${prefixo}) ${parte1}-${parte2}`;
  }

}
