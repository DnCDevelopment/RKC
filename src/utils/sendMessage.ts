// eslint-disable-next-line import/prefer-default-export
export const sendMessage = (message: { [key: string]: string }, realm: string, handleShowModal: (success: boolean) => void) => {
  fetch(`/sendMessage/?realm=${realm}`, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(message),
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      handleShowModal(true);
    })
    .catch(() => {
      handleShowModal(false);
    });
};
