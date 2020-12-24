// eslint-disable-next-line import/prefer-default-export
export const sendMessage = (message: { [key: string]: string }, realm: string, handleShowModal: (success: boolean) => void) => {
  fetch(`/sendMessage/?realm=${realm}`, {
    method: 'POST',
    body: JSON.stringify(message),
  })
    .then(() => handleShowModal(true))
    .catch(() => handleShowModal(false));
};
