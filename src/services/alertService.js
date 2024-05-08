import { toast } from "react-toastify";
export default class AlertService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  static onError(error) {
    console.log(error.message);
  }

  static initHandler() {
    const scope = this;
    window.onerror = (message, url, lineNo, columnNo, error) => {
      console.log(error, "test");

      if (error) {
        scope.onError(error);
        console.log(message, url, lineNo, columnNo, error);
      }
    };
  }

  static displayErrorAlert(message) {

    return toast(
      message,

      {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_LEFT,
        type: "error",
        theme: "colored",
      }
    );
  }

  static displaySuccessAlert(message) {
    return toast(message, {
      autoClose: 4500,
      position: toast.POSITION.TOP_RIGHT,
      type: "success",
      theme: "colored",
    });
  }
}
