import { Link } from "react-router-dom";

const links = [
  {
    header: "Features",
    linkOne: "Link Shortening",
    linkTwo: "Branded Links",
    linkThree: "Analytics",
  },
  {
    header: "Resources",
    linkOne: "Blog",
    linkTwo: "Developers",
    linkThree: "Support",
  },
  {
    header: "Company",
    linkOne: "About",
    linkTwo: "Our Team",
    linkThree: "Careers",
    linkFour: "Contact",
  },
];

export default function Footer() {
  return (
    <footer className="w-full box-border py-[65px] px-[150px] flex flex-col justify-between bg-[hsl(260,8%,14%)] max-[870px]:py-[50px] max-[870px]:px-5 max-[870px]:gap-[30px]">
      <div className="w-full flex justify-between max-[700px]:box-border max-[700px]:px-5 max-[700px]:pb-[30px] max-[700px]:flex-col max-[700px]:items-center max-[700px]:gap-[30px]">
        <div className="w-1/4">
          <p
            style={{
              fontFamily: "'EB Garamond', serif",
              fontFamily: "'Outfit', sans-serif",
            }}
            className="font-bold text-[25px] text-[hsl(255,100%,99%)] max-[700px]:text-center"
          >
            Shortly
          </p>
        </div>
        <div
          style={{ gridTemplateColumns: "24% 24% 24% 24%" }}
          className="grid w-[75%] justify-between max-[870px]:w-full max-[870px]:flex max-[870px]:flex-col max-[870px]:items-center max-[870px]:gap-[25px]"
        >
          {links.map((item) => {
            return (
              <div
                key={item.header}
                className="flex flex-col gap-3 max-[700px]:items-center max-[700px]:justify-center"
              >
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                  className="text-white font-semibold"
                >
                  {item.header}
                </p>
                <ul>
                  <li className="pb-1 list-none max-[700px]:pb-[6px] max-[700px]:text-center">
                    <Link
                      to={"#"}
                      className="text-[13px] font-medium text-[hsla(255,100%,99%,0.6)] font-['EB Garamond', serif] font-['Outfit', sans-serif] duration-500 hover:text-[hsl(180,66%,49%)]"
                    >
                      {item.linkOne}
                    </Link>
                  </li>
                  <li className="pb-1 list-none max-[700px]:pb-[6px] max-[700px]:text-center">
                    <Link
                      to={"#"}
                      className="text-[13px] font-medium text-[hsla(255,100%,99%,0.6)] font-['EB Garamond', serif] font-['Outfit', sans-serif] duration-500 hover:text-[hsl(180,66%,49%)]"
                    >
                      {item.linkTwo}
                    </Link>
                  </li>
                  <li className="pb-1 list-none max-[700px]:pb-[6px] max-[700px]:text-center">
                    <Link
                      to={"#"}
                      className="text-[13px] font-medium text-[hsla(255,100%,99%,0.6)] font-['EB Garamond', serif] font-['Outfit', sans-serif] duration-500 hover:text-[hsl(180,66%,49%)]"
                    >
                      {item.linkThree}
                    </Link>
                  </li>
                  {item.linkFour && (
                    <li className="pb-1 list-none max-[700px]:pb-[6px] max-[700px]:text-center">
                      <Link
                        to={"#"}
                        className="text-[13px] font-medium text-[hsla(255,100%,99%,0.6)] font-['EB Garamond', serif] font-['Outfit', sans-serif] duration-500 hover:text-[hsl(180,66%,49%)]"
                      >
                        {item.linkFour}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}

          <div className="flex gap-[15px] justify-end">
            <i className="fa-brands fa-facebook-f bg-[hsl(255,100%,99%)] w-4 h-4 text-center leading-4 rounded-[2px] text-sm duration-500 text-[hsl(260,8%,14%)] cursor-pointer hover:bg-[hsl(180,66%,49%)]"></i>
            <i
              className="fa-brands fa-twitter cursor-pointer text-[hsl(255,100%,99%)] hover:text-[hsl(180,66%,49%)] duration-500"
              onClick={() => window.open("https://twitter.com/Promzy_5")}
            ></i>

            <i className="fa-brands fa-pinterest-p bg-[hsl(255,100%,99%)] text-[hsl(260,8%,14%)] hover:bg-[hsl(180,66%,49%)] w-4 h-4 leading-4 text-center text-sm  duration-500 rounded-[50%] cursor-pointer"></i>

            <i className="fa-brands fa-instagram cursor-pointer text-[hsl(255,100%,99%)] hover:text-[hsl(180,66%,49%)] duration-500"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
