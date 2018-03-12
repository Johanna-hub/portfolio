const instaCall = parsedData => {
  const photoArr = parsedData.data.map(function(photo) {
    return photo.images.standard_resolution.url;
  });
  return photoArr.slice(0, 12);
};

module.exports = instaCall;
