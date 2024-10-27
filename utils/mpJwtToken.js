const mpSendToken = (user, statusCode , res , isAnon) => {

    const token = user.getJWTToken();

    const options = {
        // expire: new Date(
        //     Date.now + "5d" *24*60*60*1000
        // ),
        httpOnly: true,
    }
    if(!isAnon) {
        res.cookie("token" , null , {
            expire: new Date(Date.now()),
            httpOnly: true,
        })
    }
   
    res.status(statusCode).cookie("token",token, options).json({
        success: true,
        user,
        token
    });

}

module.exports = mpSendToken;