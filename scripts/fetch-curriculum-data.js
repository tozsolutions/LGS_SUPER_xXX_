// Fetch and process curriculum data from CSV files
const curriculumUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hafta-Matematik-TrkeParagraf-FenBilimleri-MentorMesaj-8TSYo18w2PX2LHKRC9dW2fxuXGwVaY.csv"
const mebFeaturesUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MEB%C4%B0-RbMRnOXqwMT9EfQpzfpplCFKSfy5Hw.csv"
const learningTechUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17.%20ALEX%27%C4%B0N%20GEL%C4%B0%C5%9EM%C4%B0%C5%9E%20%C3%96%C4%9ERENME%20TEKNOLOJ%C4%B0LER%C4%B0-HybzpluPdK8eltiHdMNeQ00vL6SmSm.csv"

async function fetchCurriculumData() {
  try {
    console.log("[v0] Fetching curriculum data...")

    const [curriculumRes, mebRes, techRes] = await Promise.all([
      fetch(curriculumUrl),
      fetch(mebFeaturesUrl),
      fetch(learningTechUrl),
    ])

    const curriculumText = await curriculumRes.text()
    const mebText = await mebRes.text()
    const techText = await techRes.text()

    console.log("[v0] Curriculum data sample:", curriculumText.substring(0, 200))
    console.log("[v0] MEB features sample:", mebText.substring(0, 200))
    console.log("[v0] Learning tech sample:", techText.substring(0, 200))

    // Parse CSV data
    const parseCsv = (text) => {
      const lines = text.split("\n")
      const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())
      return lines
        .slice(1)
        .map((line) => {
          const values = line.split(",").map((v) => v.replace(/"/g, "").trim())
          const obj = {}
          headers.forEach((header, index) => {
            obj[header] = values[index] || ""
          })
          return obj
        })
        .filter((obj) => Object.values(obj).some((v) => v)) // Remove empty rows
    }

    const curriculum = parseCsv(curriculumText)
    const mebFeatures = parseCsv(mebText)
    const learningTech = parseCsv(techText)

    console.log("[v0] Parsed curriculum:", curriculum.slice(0, 3))
    console.log("[v0] Parsed MEB features:", mebFeatures.slice(0, 3))
    console.log("[v0] Parsed learning tech:", learningTech.slice(0, 3))

    return { curriculum, mebFeatures, learningTech }
  } catch (error) {
    console.error("[v0] Error fetching curriculum data:", error)
    return null
  }
}

// Execute the function
fetchCurriculumData()
