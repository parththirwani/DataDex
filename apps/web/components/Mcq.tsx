import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/card"
// import { RadioGroup } from "@repo/ui/radio-group"
import { Button } from "@repo/ui/button";

export default function Mcq() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">Multiple Choice Question</CardTitle>
        <CardDescription>Select the correct answer for the following question.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {/* <RadioGroup defaultValue="a"> */}
            <div>
              <span className="font-semibold">A. Which of the following is a programming language?</span>
            </div>
            <div>
              <span className="font-semibold">B. Which of the following is a fruit?</span>
            </div>
            <div>
              <span className="font-semibold">C. Which of the following is a planet?</span>
            </div>
          {/* </RadioGroup> */}
        </div>
        <Button size="lg">Submit</Button>
      </CardContent>
    </Card>
  )
}