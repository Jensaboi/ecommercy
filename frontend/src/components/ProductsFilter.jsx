import { Form, useSubmit } from "react-router-dom";

export default function ProductsFilter() {
  const submit = useSubmit();
  return (
    <Form onChange={e => submit(e.currentTarget)} method="GET">
      <div></div>
    </Form>
  );
}
