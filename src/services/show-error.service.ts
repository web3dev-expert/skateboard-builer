import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class ShowErrorService {

    constructor(private toastr: ToastrService) { }

    handleError(error: any) {
        this.toastr.error(error?.error?.message? error?.error?.message :error?.error?.messageList!=undefined? error?.error?.messageList[0] : 'Something wrong happened.');
    }
}