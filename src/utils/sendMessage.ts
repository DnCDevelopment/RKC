// eslint-disable-next-line import/prefer-default-export
export const sendMessage = (message: { [key: string]: string }, realm: string, handleShowModal: (success: boolean) => void) => {
  fetch(`https://us-central1-rkc-roof.cloudfunctions.net/sendMessage/?realm=${realm}`, {
    method: 'POST',
    body: JSON.stringify(message),
  })
    .then(res => {
      if (res.ok) {
        handleShowModal(true);
      } else {
        throw Error(res.statusText);
      }
    })
    .catch(() => {
      handleShowModal(false);
    });
};
