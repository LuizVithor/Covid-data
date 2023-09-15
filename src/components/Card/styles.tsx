import { styled } from 'styled-components';

export const CardStyled = styled.div`
    height: 390px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 20px 30px -10px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    min-width: 260px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;
    transition: all 0.4s ease;
    margin: 0 10px;

    &:before {
      height: 190px;
      width: calc(100% + 100px);
      content: "";
      position: absolute;
      background-image: linear-gradient(to top, #2f89d3 0%, #195381 100%);
      border-radius: 4px 4px 100% 100%;
      transition: all 0.4s ease-out;
      top: 0;
    }
    
    .close {
      width: 18px;
      height: 18px;
      position: absolute;
      z-index: 2;
      cursor: pointer;
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center;
      top: 0;
      right: 0;
      margin: 10px;
      padding: 5px;
      transition: all 0.2s ease;

      &:hover {
        background-size: 100%;
        opacity: 0.8;
      }
    }

    .arrow {
      display: none;
    }

    article {
      z-index: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;

      h2 {
        color: white;
        margin: 0;
        padding: 40px 20px 10px 20px;
        font-weight: 500;
        font-size: 24px;
        letter-spacing: 0.5px;
      }
      
      .title {
        color: white;
        padding: 10px 20px;
        letter-spacing: 0.8px;
        font-size: 1rem;
        transition: all 0.4s ease;
      }

      .desc {
        padding: 10px 30px;
        font-size: 14px;
        text-align: center;
        line-height: 24px;
        color: #666;
        height: 90px;
        transition: all 0.4s ease-out;

        span {
          font-weight: bold;
        }
      }

      .pic {
        width: 120px;
        height: 120px;
        overflow: hidden;
        margin: 0px 0;
        box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.3);
        transition: all 0.6s ease;

        img {
          width: 100%;
          -webkit-filter: grayscale(70%);
          filter: grayscale(70%);
        }
      }
    }
    .actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: white;
      //bottom: 4px;
      z-index: 1;

      .btn {
        border: 0;
        background-color: transparent;
        box-sizing: border-box;
        width: calc(50% - 1px);
        height: 36px;
        margin: 0;
        text-transform: uppercase;
        font-size: 10px;
        transition: all 0.6s ease-in-out;
        cursor: pointer;
        color: #4481eb;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        font-family: $font;
        letter-spacing: 0.5px;
        background: rgba(68, 129, 235, 0.08);

        span {
          z-index: 1;
          opacity: 1;
          transition: all 0.4s ease-in-out;
        }

        .icon {
          width: 10px;
          opacity: 0;
          position: absolute;
          transition: all 0.2s ease-in-out;
        }

        &:before {
          content: "";
          width: 100%;
          height: 0%;
          position: absolute;
          background: #4481eb;
          transition: all 0.4s ease;
          bottom: 0;
          opacity: 0.2;
        }

        &:focus {
          outline: 0;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.5);

          span {
            opacity: 0;
            transition: all 0.3s ease-in-out;
          }

          .icon {
            width: 22px;
            opacity: 1;
            transition: all 0.4s ease-in-out;
          }

          &:nth-child(3) {
            .icon {
              width: 18px;
            }
          }
          &:before {
            height: 100%;
          }
        }
        
        &.clicked {
          
          span {
            display: none;
          }
          .icon {
            width: 22px;
            opacity: 1;
            animation: icon 0.5s ease forwards;
            
            @keyframes icon {
              0%{
                width: 22px;
              }
              50%{
                width: 40px;
              }
              100%{
                width: 22px;
              }
            }
          }
          &:before {
            opacity: 0.3;
            height: 100%;
          }
        }
      }
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.3);

      &:before {
        height: 100%;
        border-radius: 4px;
      }

      .desc {
        color: white;
      }
      
      .pic {
        /* box-shadow: 0px 0px 0px 8px rgba(255, 255, 255, 0.3); */
        img {
          -webkit-filter: grayscale(50%);
          filter: grayscale(50%);
        }
      }
    }

    &.closed {
      min-width: 120px;
      max-width: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.6s ease;
      cursor: pointer;

      .title,
      .desc,
      .actions,
      .close {
        display: none;
      }

      h2 {
        padding: 0;
        height: 100%;
        transform: rotate(-90deg);
        width: 440px;
        z-index: 2;
        transition: all 0.6s ease;
      }

      .pic {
        border-radius: 100%;
        height: 400px;
        width: 400px;
        position: absolute;
        top: -20px;
        margin: 0;
        box-shadow: 0;
        transition: all 0.6s ease;

        img {
          object-fit: cover;
          height: 100%;
          transform: translateY(20px);
        }

        &:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: black;
          opacity: 0.5;
          z-index: 1;
          transition: all 0.4s ease;
          transform: translateY(20px);
        }
      }

      &:before {
        height: 100%;
        border-radius: 4px;
      }

      .arrow {
        width: 18px;
        height: 18px;
        position: absolute;
        z-index: 2;
        cursor: pointer;
        bottom: 15px;
        padding: 5px;
        display: flex;
        justify-content: center;
        background-image: url("https://rafaelavlucas.github.io/assets/icons/misc/expand.svg");
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
        transition: all 0.2s ease;
      }

      &:hover {
        .arrow {
          background-size: 100%;
          opacity: 0.6;
        }
      }
    }
`