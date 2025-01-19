export default function (postUserID,rabbitMQresponses) {
    // console.log(postUserID)
    let answer;
    rabbitMQresponses.users.forEach(rabbitMQresponse => {
        // console.log(rabbitMQresponse)
        if (rabbitMQresponse.id == postUserID) answer = rabbitMQresponse;
    })
    return answer;
}