module.exports = async function (context, req) {
    let document = context.bindings.database


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: document
    };
}