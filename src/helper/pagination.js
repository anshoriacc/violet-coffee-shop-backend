const pagination = (data, query, totalData,limit, offset,status, message = 'success', error = null ) => {
    
    const totalPage = Math.ceil(totalData / limit);
    
    let {page, path} = query;
    page = parseInt(page)
    let queryString = ''
    Object.keys(query).forEach((key) => {
      if (key !== 'page' && key !== 'path') {
        queryString += `&${key}=${query[key]}`;
      }
    });
    const prevLink = (page !== 1 ? `${path}=${page - 1}${queryString}` : null);
    const nextLink = (page !== totalPage ? `${path}=${page + 1}${queryString}` : null);

    const resultPrint = {
      offset: offset ?? null,
      limit: limit || null,
      total_data: totalData || 0,
      total_page: totalPage || 0,
      perv_link: prevLink || null,
      next_link: nextLink || null,
      message: message || null,
      status: status || 500,
      err: error || null,
      data: data || null,
    };
    return resultPrint
  }
  
  module.exports = pagination;