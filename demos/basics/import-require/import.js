import fetch, { FetchOptions }  from './env';
const args  = {
  url: 'http://www.baidu.com'
}
const result = await fetch(args);