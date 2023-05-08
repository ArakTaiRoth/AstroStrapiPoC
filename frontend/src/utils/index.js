import pluralize from 'pluralize';
import dotenv from 'dotenv';

dotenv.config();
export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.PUBLIC_API_URL || 'http://localhost:1337'}${url}`;
}

export function getStrapiURL(path) {
  return `${
    process.env.PUBLIC_API_URL || 'http://localhost:1337'
  }/api${path}`;
}

export function handleRedirection(preview, custom) {
  if (preview) {
    return {
      redirect: {
        destination: `/api/exit-preview`,
        permanent: false,
      },
    };
  } else if (custom) {
    return {
      redirect: {
        destination: `/${custom}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
}

export async function getArticles(key) {
  const categoryName = key.queryKey[1].category;
  const localeCode = key.queryKey[2].locale;
  const pageNumber = key.queryKey[3].page;
  const perPage = key.queryKey[4].perPage;

  const start = +pageNumber === 1 ? 0 : (+pageNumber - 1) * perPage;

  let baseUrl = getStrapiURL(
    `/articles?pagination[limit]=${perPage}&pagination[start]=${start}&pagination[withCount]=true&populate=image,category,author,seo`
  );

  if (categoryName) {
    baseUrl = `${baseUrl}&filters[category][name][$eq]=${categoryName}`;
  }

  if (localeCode) {
    baseUrl = `${baseUrl}&locale=${localeCode}`;
  }

  const res = await fetch(baseUrl);
  const articles = await res.json();

  return { articles: articles.data, count: articles.meta.pagination.total };
}

export async function fetchStrapiData(path) {
  console.log('=======Backend Request======= \nurl: ', path, '\n============================');
  const res = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  const json = await res.json();
  if (!json.data) {
    console.error('This is an empty response', path);
  }
  return json.data;
}
