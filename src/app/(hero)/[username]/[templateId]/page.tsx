// this will decode the url endcode content like
// %40itsparser  to @itsparser
function decodeURL(url: string) {
    return decodeURIComponent(url);
}

export default function Page({
                                 params,
                             }: {
    params: { templateId: string, username: string }
}) {
    let userID = decodeURL(params.username);
    if (userID.startsWith("@")) {
        userID = userID.substring(1);
    }


    return (<h1>My Page ---{userID}---- {params.templateId}</h1>);
}