import { Button, Container, Heading } from "@chakra-ui/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";
export default function Invoice() {
  let params: any = useParams();
  let invoice: any = getInvoice(parseInt(params.invoiceId, 10));
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <Container>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <Button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices" + location.search);
          }}
        >
          Delete invoice
        </Button>
      </p>
    </Container>
  );
}
