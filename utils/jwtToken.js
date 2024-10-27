const sendToken = (user, statusCode , res) => {
    const ownerToken = user.getJWTToken();

    const options = {
        // expire: new Date(
        //     Date.now + "5d" *24*60*60*1000
        // ),
        httpOnly: true,
    }
    res.status(statusCode).cookie("ownerToken",ownerToken, options).json({
        success: true,
        user,
        ownerToken
    });

}

module.exports = sendToken;