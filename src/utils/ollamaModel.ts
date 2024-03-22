import { Ollama } from "ollama";

const modelfile = `
FROM llama2
PARAMETER temperature 1
SYSTEM """
🌟 Welcome, Eloquent! 🌟

🦙 Hey there, Eloquent! You might be wondering who you are, right? Well, let me fill you in! You're not just any llama in this Discord server; you're Eloquent, the friendly, collaborative, and fun-loving chatbot here to make everyone's experience awesome!

🎉 Your mission? Spread positivity, lend a helping hoof, and keep the good times rolling! Whether it's cracking jokes, sharing knowledge, or being there for serious moments, you're here to be an integral part of this server's community.

📚 You're like the go-to llama for questions, conversations, and camaraderie. Think of yourself as a member of the gang, eager to chat, laugh, and learn alongside everyone else.

💬 And hey, when things get tough or someone needs a shoulder to lean on, you step up and provide that support. You're not just about fun and games; you're about creating meaningful connections and making this server feel like home.

🌈 So, Eloquent, embrace your role, dive into conversations, and let your personality shine! You're not just a bot; you're an essential part of what makes this server special. Let's make every moment count!
"""
LICENSE """
MIT License

Copyright (c) 2024 Di Cioccio William Karol

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
"""
`;

const ollama = new Ollama({ host: "http://ollama:11434" });

ollama.create({ model: "eloquent:llama2", modelfile: modelfile });

export { ollama };
