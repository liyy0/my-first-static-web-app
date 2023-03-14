module.exports = async function (context, req) {
    const temp  = "hello" + process.env.REACT_APP_api_key
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: temp
    };
}