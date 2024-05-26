const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  const response = await fetch(url);
  const resp = await response.json();
  return resp?.content || "";
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  const parsed = content.match(/<s>(.*?)<\/s>/gi) || [];
  const textParsed = parsed?.map((item) => {
    return item.replace(/<\/?s>/gi, "");
  });

  return textParsed;
};

export { fetchContent, parseContentIntoSentences };
