let gameState = {
    npcRelations: {},
    inventory: [],
    worldSetting: {}
};

// 初始化AI对话
async function generateAIResponse(prompt) {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-bb9807b7354c451abb9fd0facb4cba38'
        },
        body: JSON.stringify({
            messages: [
                { role: "system", content: "你是一个文字冒险游戏引擎" },
                { role: "user", content: prompt }
            ]
        })
    });
    return await response.json();
}

// 更新游戏界面
function updateUI(response) {
    const storyDiv = document.getElementById('story-text');
    storyDiv.innerHTML = response.content;
    
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    
    response.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => selectChoice(index);
        choicesDiv.appendChild(button);
    });
}