export const getData = (dataset) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `https://www.vdocipher.com/blog/wp-json/wp/v2/${dataset}?per_page=100`
      )
        .then((res) => res.json())
        .then((result) => {
          resolve(result);
        });
    } catch (err) {
      console.log("error fetching data", err);
      resolve(null);
    }
  });
};

export const calculateTotalCount = (data, conf) => {
  const { diff, max, dataset } = conf;
  const dataMap = calculateContentLength(data);
  return sortArrayData(dataMap, diff, max, dataset);
};

const calculateContentLength = (data) => {
  const map = data.map((item) => {
    const content = item.content.rendered;
    const stripedHtml = content.replace(/<[^>]+>/g, "");
    return {
      id: item.id,
      contentLength: stripedHtml.length,
    };
  });

  return map;
};

const sortArrayData = (map, diff, max, dataset) => {
  const data = map.sort((a, b) => a.contentLength - b.contentLength);
  const postChartData = [["word count", dataset]];

  let start = 0;
  let end = start + diff;
  let totalCount = 0;
  for (let i = 0, x = data.length; i < x; i++) {
    const { contentLength } = data[i];
    if (typeof end !== "string" && contentLength > end) {
      postChartData.push([`${start}-${end}`, totalCount]);

      start = end;
      end = start + diff;
      if (end > max) {
        if (contentLength < max) {
          end = max;
        } else {
          start = max;
          end = "infinity";
        }
      }

      if (contentLength > end) {
        totalCount = 0;
        postChartData.push([`${start}-${end}`, totalCount]);
        while (contentLength > end) {
          if (end > max) {
            start = max;
            end = "infinity";
            totalCount = 1;
            break;
          }

          start = end;
          end = start + diff;
          postChartData.push([`${start}-${end}`, totalCount]);
        }
        totalCount = 1;
      } else {
        totalCount = 1;
      }
    } else {
      totalCount++;
    }
    console.log("cahart data", start, end, contentLength);

    if (i === x - 1) postChartData.push([`${start}-${end}`, totalCount]);
  }
  return postChartData;
};
