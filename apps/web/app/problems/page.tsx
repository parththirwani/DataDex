import { Problems}  from "../../components/Problems";
import { getMCQProblems, getProblems } from "../db/problem";

export default async function Page() {
  return (
    <main>
      <Problems />
    </main>
  );
}

export const dynamic = "force-dynamic"