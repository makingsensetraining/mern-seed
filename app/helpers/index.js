import toastr from 'toastr';

export function alertMessage(alert) {
  if (alert.show) {
    switch (alert.message.type) {
      case 'success':
        toastr.success(alert.message.content);
        break;
      case 'error':
        toastr.error(alert.message.content);
        break;
      default:
        return false;
    }
  }
  return false;
}
