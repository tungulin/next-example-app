export const getQueryParams = (
  params: Record<string, string | number | undefined>
) => {
  let queryParams = new URLSearchParams();

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      if (params[key] !== undefined)
        queryParams.append(key, params[key].toString());
    }
  }

  return queryParams.toString();
};
