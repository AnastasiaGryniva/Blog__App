const posts = [];

TITLE_VALIDATION_LIMIT = 100;
TEXT_VALIDATION_LIMIT = 200;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMassage = document.querySelector('.js-validation')
const remainTitle = document.querySelector('.js-remainsTitle');
const remainText = document.querySelector('.js-remainsText');

newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();
    
    addPost(postFromUser);

    renderPosts();
    
});

postTitleInputNode.addEventListener('input', validation);
postTextInputNode.addEventListener('input', validation);

function validation() {
    const titleLem = postTitleInputNode.value.length;
    const textLem = postTextInputNode.value.length;

    if(titleLem > TITLE_VALIDATION_LIMIT) {
        validationMassage.innerHTML = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
        validationMassage.classList.remove('validation__hidden');
        
        return;
    }

    if(textLem > TEXT_VALIDATION_LIMIT) {
        validationMassage.innerHTML = `Длина текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
        validationMassage.classList.remove('validation__hidden');

        return;
    }

    validationMassage.classList.add('validation__hidden');
    
}

postTextInputNode.addEventListener('input', remainsText);

function remainsText() {
    const textLem = TEXT_VALIDATION_LIMIT - postTextInputNode.value.length ;
    if(textLem ) {
        remainText.innerHTML = `Допустимое колличество символов текста осталось:${textLem}`;
        return;
    }
    
    remainText.classList.add('validation__hidden');
}

postTitleInputNode.addEventListener('input', remainsTitle);

function remainsTitle() {
    const titleLem = TITLE_VALIDATION_LIMIT - postTitleInputNode.value.length ;
    if(titleLem ) {
        remainTitle.innerHTML = `Допустимое колличество символов заголовка осталось:${titleLem}`;
        return;
    }
    remainTitle.classList.add('validation__hidden');
}

postTitleInputNode.addEventListener('input',noneTitleBtn);

function noneTitleBtn() {
    const titleLem = postTitleInputNode.value.length;

    if(titleLem <= TITLE_VALIDATION_LIMIT) {
        newPostBtnNode.classList.remove('none-post-btn');
        
        return;
    }
    newPostBtnNode.classList.add('none-post-btn');
    newPostBtnNode.disabled = true;
}

postTextInputNode.addEventListener('input', noneTextBtn);

function noneTextBtn() {
    const textLem = postTextInputNode.value.length ;
    if(textLem <= TEXT_VALIDATION_LIMIT) {
        newPostBtnNode.classList.remove('none-post-btn');
        
        return;
    }
    
    newPostBtnNode.classList.add('none-post-btn');
    newPostBtnNode.disabled = true;
}

function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;

    return {
        title: title,
        text: text,
    };
};

function addPost({ title, text}) {
    const currentDate = new Date();
    const dt = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}  ${currentDate.getHours()}:${currentDate.getMinutes()} `;
    
    if( !title){
        return(alert('Заголовок пустой'))
    }

    if( !text){
        return(alert('Введите текст поста'))
    }


    posts.push({
        dt,
        title,
        text
    });
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
            <div class='post'>
                <p class='post__date'>${post.dt}</p>
                <p class='post__title'>${post.title}</p>
                <p class='post__text'>${post.text}</p>
            </div>
        `
    });

    postsNode.innerHTML = postsHTML;
    
}
