import About from "@/components/about";
import FormLogo from "@/components/formLogo";
import Product from "@/components/product";
import ProductExample from "@/components/productExample";
import { Form } from "radix-ui";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
     <FormLogo />
     <Product />
     <About />
     <ProductExample />
    </main>
  );
}
