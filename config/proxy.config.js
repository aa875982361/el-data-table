// 不能以斜杠结尾
const apiServer = process.env.API_SERVER;

const mockServer = 'http://39.98.50.163:3000/mock/995';

module.exports = {
  mock: {
    '/deepexi-dashboard': mockServer,
    '/xpaas-enterprise-contact': mockServer,
    '/xpaas-console-api': mockServer,
    '/training': 'http://39.100.141.76:3000/mock/107',
  },
  dev: {
    '/deepexi-dashboard': apiServer,
    '/xpaas-enterprise-contact': apiServer,
    '/xpaas-console-api': apiServer,
  },
};
