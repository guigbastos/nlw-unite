let participantes = [
    {
        nome: "Guilherme Bastos",
        email: "guiba@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: "João Silva",
        email: "joaosilva@gmail.com",
        dataInscricao: new Date(2024, 2, 20, 10, 15),
        dataCheckIn: null
    },
    {
        nome: "Maria Souza",
        email: "mariasouza@hotmail.com",
        dataInscricao: new Date(2024, 2, 18, 14, 45),
        dataCheckIn: new Date(2024, 2, 22, 9, 10)
    },
    {
        nome: "Pedro Santos",
        email: "pedrosantos@yahoo.com",
        dataInscricao: new Date(2024, 2, 16, 21, 0),
        dataCheckIn: new Date(2024, 2, 21, 12, 20)
    },
    {
        nome: "Ana Oliveira",
        email: "anaoliveira@gmail.com",
        dataInscricao: new Date(2024, 2, 14, 11, 30),
        dataCheckIn: new Date(2024, 2, 19, 16, 40)
    },
    {
        nome: "Carlos Rodrigues",
        email: "carlosrodrigues@gmail.com",
        dataInscricao: new Date(2024, 2, 12, 17, 10),
        dataCheckIn: null
    },
    {
        nome: "Fernanda Costa",
        email: "fernandacosta@hotmail.com",
        dataInscricao: new Date(2024, 2, 10, 8, 20),
        dataCheckIn: new Date(2024, 2, 15, 14, 55)
    },
    {
        nome: "Rafaela Pereira",
        email: "rafaelapereira@gmail.com",
        dataInscricao: new Date(2024, 2, 8, 23, 45),
        dataCheckIn: new Date(2024, 2, 13, 11, 25)
    },
    {
        nome: "Daniel Almeida",
        email: "danalmeida@yahoo.com",
        dataInscricao: new Date(2024, 2, 6, 12, 35),
        dataCheckIn: null
    },
    {
        nome: "Juliana Fernandes",
        email: "julianafernandes@gmail.com",
        dataInscricao: new Date(2024, 2, 4, 9, 0),
        dataCheckIn: new Date(2024, 2, 9, 17, 15)
    }

]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)



    if(participante.dataCheckIn == null) {
      dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
      Confirmar check-in
      </button>
      `
    }

    return `
    <tr>
        <td>
        <strong>
         ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
        </td>
       <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = "" 
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email 
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}