var obj = {
    answer: ''
};

function emit(){
    $issue.ask(obj)
        .yes(() => obj.answer = 'yes')
        .no(() => obj.answer = 'no')
        .publish();
}