import {Injectable} from "@angular/core";
import {MessageService} from "primeng/api";

@Injectable()
export class Utils {

  constructor(private service: MessageService) {

  }

  showMessages(status: string, info: string, key: string) {
    this.service.add({
      key: key,
      severity: status === "1" ? "warn" : status === "2" ? "success" : status === "3" ? "error" : "info",
      summary: 'Virtus',
      detail: info
    });
  }

}
