import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table,  Container, Header, Content, Navbar, Icon, Breadcrumb, IconButton } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

type props = {
  codUnidade: number
}

export default function Servidores() {
    const { codUnidade } = useParams < { codUnidade: string }>()
    const [servidores, setServidores] = useState()
    const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
        fetch(`https://localhost:5001/servidores-da-unidade/${codUnidade}`)
            .then(i => i.json())
          .then(i => {
              console.log(i)
            i.forEach((servidor: any) =>
              servidor.nome = servidor.nome
                                .replace('<b>', '')
                                .replace('</b>', '')
            )
              console.log(i)
              setServidores(i.sort((a: { nome: string; },b: { nome: any; }) => a.nome.localeCompare(b.nome)))
            })
            .finally(() => setIsLoading(false)) 
    }, [codUnidade])

    return (
      <Container >
        
        <Header style={{
          display: 'flex',
          padding: "10px 85px",
          backgroundColor: "black",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <section>
            <img width={"80px"} src="https://upload.wikimedia.org/wikipedia/commons/6/60/Bras%C3%A3o_PCDF.png" alt="" />
            <div
              style={{
                paddingLeft: "30px",
                color: "white",
                display: "inline"
              }}
              >
                
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: 500,
                  display: "inline"
                }}
              >
                Polícia Civil do Distrito Federal 
              </p>
            </div>
          </section>

          <section
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "15px",
              backgroundColor: "#575757",
              borderRadius: "10px",
              color: "white"
            }}
          >
            <div>
              <p>Fernando Santos Ferreira</p>
              <p>0022985</p>
            </div>
            <Icon
              icon="sign-out"
              style={{
                fontSize: "25px"
              }}
            />
          </section>
        </Header>
        
        <Navbar
          style={{
            backgroundColor: "#bea55a",
          }}
        >
          <Navbar.Header
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 95px",
            }}
          >
            <Icon
              icon="chevron-left"
              style={{
                marginRight: "15px",
                color: "white",
                fontWeight: 500,
                fontSize: "16px"
              }}
            />
            <a
              href="http://10.93.35.172:83/scriptcase/app/c_sispen/menu_saa/menu_saa.php"
              style={{
                color: "white",
                fontWeight: 500,
                fontSize: "16px"

              }}
            >
              Ir para o SGA antigo
            </a>
          </Navbar.Header>
        </Navbar>
        
        <Breadcrumb
          separator={"/"}
          style={{
            padding:"5px 95px"
          }}
        >
          <Breadcrumb.Item href="/">
              SGA
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/components/overview">
            Gestão de servidores
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Servidores</Breadcrumb.Item>
        </Breadcrumb>
        
        <div
          style={{
            padding: "0 100px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Icon
              icon="peoples"
              style={{
                fontSize: "36px"
              }}
            />
            <span
              style={{
                fontSize: "36px",
                marginLeft: "15px"
              }}    
            >
              Servidores
            </span>
          </div>

          <div>
            <IconButton
              icon={<Icon
                icon="filter"
                style={{
                  backgroundColor: "rgb(190, 165, 90)",
                  color: "white"
                }}
              />}
              style={{
                backgroundColor: "rgb(190, 165, 90)",
                  color: "white"

              }}
            >
              Filtrar
            </IconButton>
          </div>
          
        </div>
        

        <Content>
            <Table
              data={servidores}
              virtualized
              height={window.innerHeight}
              width={window.innerWidth}
              loading={isLoading}
              loadAnimation={true}
              affixHeader
              hover
              style={{
                padding: "0 85px",
              }}            >
              
              <Column verticalAlign="middle" align="center" fixed>
                <HeaderCell></HeaderCell>
                <Cell>
                  <Icon
                    icon="edit2"
                  />
                </Cell>
            </Column>
            
              <Column width={600} align="left" fixed>
                <HeaderCell>Nome</HeaderCell>
                <Cell dataKey="nome" />
              </Column>

              <Column width={150}>
                <HeaderCell>Nome de Guerra</HeaderCell>
                <Cell dataKey="guerra" />
              </Column>

              <Column width={120}>
                <HeaderCell>Matrícula</HeaderCell>
                <Cell dataKey="matricula" />
              </Column>

              <Column width={120}>
                <HeaderCell>Siape</HeaderCell>
                <Cell dataKey="matriculaSiape" />
              </Column>

              <Column width={300}>
                <HeaderCell>Cargo</HeaderCell>
                <Cell dataKey="cargo" />
              </Column>

              <Column width={200}>
                <HeaderCell>Função</HeaderCell>
                <Cell dataKey="funcao" />
              </Column>
              <Column width={150}>
                <HeaderCell>Situação</HeaderCell>
                <Cell dataKey="situacao" />
              </Column>
            </Table>
        </Content>
      </Container>
    );
}