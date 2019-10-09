let baseUrl;
if (process.env.NODE_ENV === "production") {
    // baseUrl = "https://mos.dpmall.com/dpmall-web"; //正式机环境
    // baseUrl = "http://172.20.15.70:8080/dpmall-web"; //阿乐环境
    baseUrl = "http://47.107.138.9:8082/dpmall-web"; //测试机环境
} else {
    baseUrl = "api/dpmall-web"; //开发环境
}
console.log(process.env.NODE_ENV);
console.log('baseUrl', baseUrl);
export default baseUrl