export const post = async (url: string, body: Object) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
  });
  return response;
};

export const put = async (url: string, body: Object) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
  });
  return response;
};

export const destroy = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
    },
  });
  return response;
};

export const get = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
    },
  });
  return response;
};
