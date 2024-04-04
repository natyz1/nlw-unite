let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Natália do Nascimento",
    email: "natyzinha@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "João Silva",
    email: "joao.silva@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 12, 30),
    dataCheckIn: new Date(2024, 0, 10, 14, 45)
  },
  {
    nome: "Maria Oliveira",
    email: "maria.oliveira@gmail.com",
    dataInscricao: new Date(2023, 11, 17, 9, 15),
    dataCheckIn: new Date(2023, 11, 20, 17, 30)
  },
  {
    nome: "Pedro Santos",
    email: "pedro.santos@gmail.com",
    dataInscricao: new Date(2023, 10, 30, 15, 45),
    dataCheckIn: new Date(2023, 11, 5, 18, 20)
  },
  {
    nome: "Ana Sousa",
    email: "ana.sousa@gmail.com",
    dataInscricao: new Date(2023, 9, 8, 10, 0),
    dataCheckIn: new Date(2023, 9, 12, 16, 10)
  },
  {
    nome: "Carlos Costa",
    email: "carlos.costa@gmail.com",
    dataInscricao: new Date(2023, 7, 25, 14, 20),
    dataCheckIn: new Date(2023, 7, 30, 20, 30)
  },
  {
    nome: "Mariana Fernandes",
    email: "mariana.fernandes@gmail.com",
    dataInscricao: new Date(2023, 6, 13, 18, 45),
    dataCheckIn: new Date(2023, 6, 18, 22, 15)
  },
  {
    nome: "Rafaela Almeida",
    email: "rafaela.almeida@gmail.com",
    dataInscricao: new Date(2023, 4, 29, 8, 10),
    dataCheckIn: new Date(2023, 5, 3, 12, 40)
  },
  {
    nome: "Gustavo Martins",
    email: "gustavo.martins@gmail.com",
    dataInscricao: new Date(2023, 3, 10, 16, 30),
    dataCheckIn: new Date(2023, 3, 15, 19, 50)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

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

  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

	document
  .querySelector('tbody')
	.innerHTML = output
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
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja realizar o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}