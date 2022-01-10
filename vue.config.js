module.exports= {
    //개발 서버 설정
    devServer: {
        //프록시 설정
        proxy: {
            //127.0.0.1:8080/REST
            '/REST':{
                //프록시 요청을 보낸 서버의 주소
                target: 'http://localhost:8080',
                changeOrigin: true,
                logLevel: 'debug',
            }
        },
        //vue의 포트 번호
        //127.0.0.1:9090
        port: 9090
    }
};