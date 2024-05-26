const API_URL = "http://localhost:5174/content";

const DEFAULT_TEXT = `<speak><s>There was an error</s></speak>`;
/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const resp = await fetch(url);
    const response = await resp.json();
    return response?.content || DEFAULT_TEXT;
  } catch (error) {
    return DEFAULT_TEXT;
  }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  const parsed = content.split(/<\/?s>/i);
  // const matcher = content.substring(/<\/?s>+/);
  // console.log(matcher);

  const textParsed = parsed.filter((item) => {
    const replaced = item.replace(/<\/?speak?>/g, "");
    if (Boolean(replaced)) return replaced;
  });
  console.log(textParsed);

  return textParsed;
};

export { fetchContent, parseContentIntoSentences };
