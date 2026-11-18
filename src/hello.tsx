import {
  Button, Column, Email, Heading, Page, Text, render,
} from "@hyper-elements/react";
import { outline, validate } from "@hyper-elements/react";

function OrderUpdate({ name }: { name: string }) {
  return (
    <Column style={{ padding: 32, gap: 16 }}>
      <Heading level={1}>Thanks, {name}.</Heading>
      <Text>Your order is on its way.</Text>
      <Button
        href="https://example.com/orders/10482"
        style={{ backgroundColor: "#ef4638", color: "#ffffff" }}
      >
        Track your order
      </Button>
    </Column>
  );
}

const content = <OrderUpdate name="Ada" />;
const { html, text } = await render(<Email width={600}>{content}</Email>);
const { html: pageHtml } = await render(<Page width={960}>{content}</Page>);


const design = <Email width={600}><OrderUpdate name="Ada" /></Email>;
const report = validate(design);

console.log(report.diagnostics);
if (report.valid) console.log(outline(design));