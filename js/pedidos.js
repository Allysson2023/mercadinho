function enviarPedido(){
    const nome = document.getElementById("nomeCliente").value;
    const endereco = document.getElementById("endereco").value;
    const numero = document.getElementById("numeroCasa").value;
    const telefone = document.getElementById("telefone").value;
    const pagamento = document.getElementById("pagamento").value;
    const troco = document.getElementById("troco").value;
    const valorTroco = Number(troco);
    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR");
    const hora = agora.toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit'
    });

    // ✅ VALIDAÇÃO PRIMEIRO
    if(!nome || !endereco || !telefone){
        mostrarToast("⚠ Preencha todos os dados!");
        return;
    }

    let total = 0;
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });

    if(pagamento === "Dinheiro"){
        if(!troco){
            mostrarToast("⚠ Informe o valor para troco!");
            return;
        }

        if(valorTroco < total){
            mostrarToast("❌ Valor do troco menor que o total!");
            return;
        }
    }

    // 🟢 MENSAGEM BONITA
    let mensagem = "🛒 *NOVO PEDIDO*\n";
    mensagem += "━━━━━━━━━━━━━━━\n\n";

    mensagem += `👤 *Cliente:* ${nome}\n`;
    mensagem += `📞 *Telefone:* ${telefone}\n\n`;
    mensagem += `🕒 *Data:* ${data} às ${hora}\n\n`;

    mensagem += "🧾 *Itens do Pedido:*\n";

    carrinho.forEach(item => {
        mensagem += `• ${item.quantidade}x ${item.nome}\n`;
    });

    mensagem += "\n━━━━━━━━━━━━━━━\n";

    mensagem += `📍 *Endereço:*\n${endereco}, Nº ${numero}\n\n`;

    mensagem += `💳 *Pagamento:* ${pagamento}\n`;

    if(pagamento === "Dinheiro" && troco){
        mensagem += `💰 *Troco para:* R$ ${troco}\n`;
    }

    mensagem += "\n━━━━━━━━━━━━━━━\n";
    mensagem += "🙏 Obrigado pelo pedido!";

    const numeroWhats = "5585921996610";

    const link = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
    limpaCarrinho();
    fecharModalCliente();
    mostrarToast("✔ Pedido Enviado com sucesso!");
}

function abrirModalCliente(){
    document.getElementById("modal-carrinho").classList.add("oculto");
    document.getElementById("modal-cliente").classList.remove("oculto");
}

function fecharModalCliente(){
    document.getElementById("modal-cliente").classList.add("oculto");
}
