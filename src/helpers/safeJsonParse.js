const safeJsonParse = (data) => {
  try {
    const res = JSON.parse(data); 
    return res; 
  } catch(err) {
    return {};
  }
}

export default safeJsonParse;