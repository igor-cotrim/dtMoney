import { Summary } from "../Summary";
import { Transactionstable } from "../TransactionsTable";

import { Container } from "./styles";

export function Dashboard() {
  return (
    <div>
      <Container>
        <Summary/>
        <Transactionstable/>
      </Container>
    </div>
  )
}
