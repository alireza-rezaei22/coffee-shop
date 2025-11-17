export default function ArticleItem() {
    return (
      <div className="bg-zinc-300 mx-5 rounded-3xl overflow-hidden">
        <img
          src="src/assets/images/article.jpg"
          alt=""
          className="size-full"
        />
        <div className="p-5">
          <h1 className="text-2xl font-bold text-white">
            ده مدل قهوه‌ی لاواتزا که باید امتحان کنید
          </h1>
          <p className="text-base text-zinc-500 p-4 text-lg h-32 overflow-hidden">
            اگر از نوشیدن قهوه لذت می‌برید حتما این کمپانی ایتالیایی متخصص در زمینه‌ی قهوه یکی از مشهورترین کمپانی‌هاست و...
          </p>
        </div>
      </div>
    );
  }