import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDCpZc5mkMuOQUm4xbSv5Phdih_L3y3xIk",
    authDomain: "pizzaria-3f1aa.firebaseapp.com",
    projectId: "pizzaria-3f1aa",
    storageBucket: "pizzaria-3f1aa.firebasestorage.app",
    messagingSenderId: "664031417599",
    appId: "1:664031417599:web:426003aed7dd15b95ba8ca"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const GoogleProvider = new GoogleAuthProvider();

  //Elementos Visuais

  const authScreen = document.getElementById('auth-screen');
  const dashboardScreen = document.getElementById('dashboard-screen');
  const pizzaGrid = document.getElementById('pizza-grid');

  //Elementos Login

  const inputEmail = document.getElementById('auth-email');
  const inputSenha = document.getElementById('auth-senha');

  //Elementos Cadastro

  const inputNome = document.getElementById('pizza-nome');
  const inputIngredientes = document.getElementById('pizza-ingredientes');
  const inputTipo = document.getElementById('pizza-tipo');
  const inputPreco = document.getElementById('pizza-preco');
  const inputImagem = document.getElementById('pizza-imagem');

//Monitor de autenticação

onAuthStateChanged(auth, (user) => {
    if(user){
        authScreen.classList.add('hidden');
        dashboardScreen.classList.remove('hidden');
        document.getElementById('user-display-name').textContent = user.displayName || user.email;
        carregarCardapio();
    }else{
        authScreen.classList.remove('hidden');
        dashboardScreen.classList.add('hidden');
        pizzaGrid.innerHTML = '';
    }
});
    //Processos de Login/Cadastro

    document.getElementById('btn-cadastro').addEventListener('click', async()=>{
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();
        if(!email || !senha) return alert('Preencha o email e senha!');
        try{
            await createUserWithEmailAndPassword(auth, email, senha);
            alert('Conta criada com sucesso!');
        } catch (e){
            alert(e.message);
        }
    })

    document.getElementById('btn-login').addEventListener('click', async()=>{
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();
        if(!email || !senha) return alert('Preencha o email e senha!');
        try{
            await signInWithEmailAndPassword(auth, email, senha);
        } catch (e){
            alert(e.message);
        }
    });

    document.getElementById('btn-google').addEventListener('click', async () => {
        try{
            await signInWithPopup(auth, GoogleProvider);
        }
        catch (e) {
            alert('Erro Google: ' + e.message);
        }
    });
    document.getElementById('btn-logout').addEventListener('click', () => signOut(auth));

    //Criação do Cardapio

    document.getElementById('btncadastrar').addEventListener('click', async()=>{
        const nome = inputNome.value.trim();
        const ingredientes = inputIngredientes.value.trim();
        const tipo = inputTipo.value;
        const preco = inputPreco.value.trim();
        const imagem = inputImagem.value.trim();

        if(!nome || !ingredientes || !preco)return alert('Preencha os campos obrigatórios');
        
        try{
            await addDoc(collection(db, "pizzas"), {
                nome, 
                ingredientes, 
                tipo,
                preco: Number(preco),
                imagem
            });

        inputNome.value = '';
        inputIngredientes.value = '';
        inputPreco.value = '';
        inputImagem.value = '';

        } catch (e){
            console.error(e);
        }
    });

    function carregarCardapio () {
        const q = query(collection(db, "pizzas"), orderBy("nome", "asc"));

        onSnapshot(q,(snapshot) => {
            pizzaGrid.innerHTML = '';
            if(snapshot.empty){
                pizzaGrid.innerHTML = '<p class = "loading-text">Nenhuma pizza encontrada</p>';
                return;
            }

            snapshot.forEach((doc)=> {
                const p = doc.data();
                const imgUrl = p.imagem || 'https://png.pngtree.com/png-clipart/20240306/original/pngtree-funny-pizza-face-png-image_14519093.png'

                const classBadge = p.tipo === "Doce" ? 'badge doce' : 'badge';

                const card = document.createElement('div');
                card.classList.add('pizza-card');
                card.innerHTML = `
                <img src = "${imgUrl}" class ="pizza-img" alt = "${p.nome}">
                <div class = "pizza-info">
                <h4>${p.nome}</h4>
                <p class = "pizza-desc">${p.ingredientes}</p>
                <div class = "pizza-meta">
                  <span class = "pizza-price> R$ ${parseFloat(p.preco).toFixed(2)}</span>
                  <span class = "${classBadge}">${p.tipo}</span>
                </div>
                </div>
                `;
                pizzaGrid.appendChild(card);
            });
        });
    }